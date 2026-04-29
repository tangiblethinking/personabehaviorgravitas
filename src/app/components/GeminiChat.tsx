import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Send, Sparkles, Bug, Paperclip, X, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { parsePersonaCode } from "../utils/personaParser";

interface GeminiChatProps {
  onPersonaUpdate?: (updatedPersona: any) => void;
  isExpanded?: boolean;
  onExpandToggle?: (expanded: boolean) => void;
}

export function GeminiChat({
  onPersonaUpdate,
  isExpanded = false,
  onExpandToggle,
}: GeminiChatProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modelUsed, setModelUsed] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");

  // Listen for custom event to insert LLM instructions into prompt
  useEffect(() => {
    const handleInsertInstructions = (event: Event) => {
      const customEvent = event as CustomEvent<{ instructions: string }>;
      if (customEvent.detail?.instructions) {
        setPrompt(customEvent.detail.instructions);
        toast.success("LLM Instructions inserted into chat!");
      }
    };

    window.addEventListener('insert-llm-instructions', handleInsertInstructions);

    return () => {
      window.removeEventListener('insert-llm-instructions', handleInsertInstructions);
    };
  }, []);

  // ⚠️ CLIENT-SIDE API CALL - API KEY EXPOSED TO BROWSER
  // This eliminates Edge Function timeout but exposes the API key
  // TODO: Replace this placeholder with your actual Gemini API key
  // Get your key from: https://aistudio.google.com/app/apikey
  const GEMINI_API_KEY = "AIzaSyDh7tLQ6mekMytjY1nnRibih1Nw964b_mo";

  // Supported file types with their MIME types
  const SUPPORTED_FILE_TYPES: Record<string, string> = {
    'pdf': 'application/pdf',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'webp': 'image/webp',
    'gif': 'image/gif',
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !SUPPORTED_FILE_TYPES[fileExtension]) {
      toast.error(`Unsupported file type. Supported: ${Object.keys(SUPPORTED_FILE_TYPES).join(', ')}`);
      return;
    }

    // Check file size (max 20MB for inline base64)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size: 20MB");
      return;
    }

    setSelectedFile(file);
    toast.success(`File selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // Remove the data:mime/type;base64, prefix
      const base64Data = base64String.split(',')[1];
      setFileBase64(base64Data);
      console.log(`📎 File converted to base64 (${base64Data.length} characters)`);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      setSelectedFile(null);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileBase64("");
    toast.info("File removed");
  };

  const getMimeType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return SUPPORTED_FILE_TYPES[extension || ''] || 'application/octet-stream';
  };

  const checkAvailableModels = async () => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
      );

      const data = await res.json();
      console.log("Available Gemini models:", data);
      
      if (res.ok && data.models) {
        toast.success(`Found ${data.models.length} available models. Check console for details.`);
      } else {
        toast.error(`Failed to fetch models: ${data.error?.message || "Unknown error"}`);
        console.error("Models fetch error:", data);
      }
    } catch (error) {
      console.error("Error checking models:", error);
      toast.error("Failed to check available models");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!prompt.trim()) {
      return;
    }

    setIsLoading(true);
    setResponse("");
    setModelUsed("");

    try {
      // STEP 1: Fetch available models
      console.log("🔍 Fetching available Gemini models...");
      const modelsResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
      );

      if (!modelsResponse.ok) {
        const errorData = await modelsResponse.json();
        toast.error(`Failed to fetch models: ${errorData.error?.message || "Unknown error"}`);
        console.error("Models fetch error:", errorData);
        return;
      }

      const modelsData = await modelsResponse.json();

      // STEP 2: Extract models that support generateContent
      const availableModels = modelsData.models
        ?.filter((m: any) => 
          m.supportedGenerationMethods?.includes("generateContent")
        )
        .map((m: any) => m.name.replace("models/", "")) || [];

      console.log(`✅ Found ${availableModels.length} models:`, availableModels);

      if (availableModels.length === 0) {
        toast.error("No models available for text generation");
        return;
      }

      // STEP 3: Try each model until one succeeds
      let lastError = null;

      for (const modelName of availableModels) {
        try {
          console.log(`🔄 Trying model: ${modelName}`);

          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

          // Build the parts array - include file if selected
          const parts: any[] = [{ text: prompt }];
          
          if (selectedFile && fileBase64) {
            console.log(`📎 Including file: ${selectedFile.name} (${selectedFile.type})`);
            parts.push({
              inline_data: {
                mime_type: getMimeType(selectedFile.name),
                data: fileBase64
              }
            });
          }

          const res = await fetch(geminiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: parts,
                },
              ],
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";
            
            console.log(`✅ Success with model: ${modelName}`);
            setResponse(text);
            setModelUsed(modelName);
            
            const fileInfo = selectedFile ? ` (analyzed ${selectedFile.name})` : '';
            toast.success(`Response received!${fileInfo} (using ${modelName})`);

            // 🚀 AUTO-APPLY: Try to parse and update persona data from the response
            if (onPersonaUpdate && text) {
              console.log("🤖 Auto-detecting persona code in Gemini response...");
              const parseResult = parsePersonaCode(text);

              if (parseResult.success && parseResult.data) {
                console.log("✅ Successfully parsed persona code! Auto-applying...");
                onPersonaUpdate(parseResult.data);
                toast.success("✨ Persona automatically updated from Gemini response!", {
                  duration: 3000,
                });
              } else {
                console.log("ℹ️ No valid persona code detected in response");
              }
            }
            
            return; // Exit after successful response
          } else {
            const errorData = await res.json();
            console.log(`❌ Model ${modelName} failed:`, errorData.error?.message);
            lastError = errorData.error?.message || "Unknown error";
            continue; // Try next model
          }
        } catch (error: any) {
          console.log(`❌ Error with model ${modelName}:`, error.message);
          lastError = error.message;
          continue; // Try next model
        }
      }

      // If we get here, all models failed
      console.error(`❌ All ${availableModels.length} models failed. Last error:`, lastError);
      toast.error(`All models failed: ${lastError}`);

    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      toast.error(`Failed to connect to Gemini API: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Purple FAB to toggle chat - positioned below red Share FAB */}
      <Button
        onClick={() => onExpandToggle?.(!isExpanded)}
        className="fixed top-[350px] right-8 z-50 rounded-full w-14 h-14 shadow-lg bg-purple-600 hover:bg-purple-700 text-white"
        title={isExpanded ? "Hide Gemini Chat" : "Show Gemini Chat"}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Panel */}
      {isExpanded && (
        <div className="fixed bottom-[340px] right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Ask Gemini</h3>
              {onPersonaUpdate && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium" title="Persona code will be automatically applied">
                  Auto-Apply ✨
                </span>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={checkAvailableModels}
              title="Check available models (see console)"
            >
              <Bug className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* File upload section */}
            {selectedFile ? (
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded-md border border-purple-200">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Paperclip className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-purple-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-purple-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.gif"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <div className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 flex items-center gap-2 justify-center text-gray-600">
                    <Paperclip className="w-4 h-4" />
                    <span>Attach PDF or Image</span>
                  </div>
                </label>
              </div>
            )}

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your question and press Enter..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                size="icon"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            {modelUsed && (
              <div className="text-xs text-gray-500">
                Using model: {modelUsed}
              </div>
            )}

            {response && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 max-h-64 overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap">{response}</p>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}

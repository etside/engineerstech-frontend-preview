import { useRef, useState } from "react";
import { adminApi } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ label, value, folder, onChange }: ImageUploadProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await adminApi.upload(file, folder);
      onChange(url);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-secondary disabled:opacity-50"
        >
          {uploading ? (
            <span className="h-3 w-3 border border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <Upload size={12} />
          )}
          {uploading ? "Uploading..." : "Choose File"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1 rounded hover:bg-destructive/10"
            title="Remove image"
          >
            <X size={12} className="text-destructive" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          className="mt-1 h-16 w-auto rounded-lg object-cover border border-border"
        />
      )}
    </div>
  );
};

export default ImageUpload;

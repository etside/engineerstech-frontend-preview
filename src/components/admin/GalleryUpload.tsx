import { useRef, useState } from "react";
import { adminApi } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface GalleryUploadProps {
  label: string;
  value: string[];
  folder: string;
  onChange: (urls: string[]) => void;
}

const GalleryUpload = ({ label, value, folder, onChange }: GalleryUploadProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await adminApi.upload(file, folder);
      onChange([...value, url]);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {value.map((url, i) => (
          <div key={i} className="relative group">
            <img src={url} alt={`${label} ${i + 1}`} className="h-20 w-20 object-cover rounded-lg border border-border" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="h-20 w-20 flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border hover:bg-secondary text-muted-foreground disabled:opacity-50"
        >
          {uploading ? (
            <span className="h-4 w-4 border border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          <span className="text-[10px]">{uploading ? "Uploading" : "Add Image"}</span>
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
};

export default GalleryUpload;

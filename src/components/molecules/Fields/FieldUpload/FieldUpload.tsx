import { useFormContext } from "react-hook-form";
import { UploadFieldProps } from "../Field";
import { Required } from "@/components/atoms/Required";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/Form/Form";
import { useId, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { LucideUpload, LucideFile, LucideX } from "lucide-react";

export function FieldUpload({
  name,
  label = "Upload File",
  description,
  helpText = "Drag and drop files here or click to browse",
  required = false,
  disabled = false,
  accept,
  multiple = false,
  maxSize,
  validateFile,
  className,
  ...props
}: UploadFieldProps) {
  const { control, getFieldState, setValue } = useFormContext();
  const fieldState = getFieldState(name);
  const fileInputId = useId();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFiles = (files: FileList): string | null => {
    if (!files || files.length === 0) return null;

    // Check file size if maxSize is provided
    if (maxSize) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          return `File "${
            files[i].name
          }" exceeds the maximum size of ${formatBytes(maxSize)}`;
        }
      }
    }

    // Run custom validation if provided
    if (validateFile) {
      for (let i = 0; i < files.length; i++) {
        const error = validateFile(files[i]);
        if (error) return error;
      }
    }

    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validationError = validateFiles(files);
    if (validationError) {
      setValue(name, null);
      setFileNames([]);
      return;
    }

    setValue(name, multiple ? files : files[0], { shouldValidate: true });

    // Update file names for display
    const names = [];
    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }
    setFileNames(names);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    // Check if multiple files are not allowed but multiple were dropped
    if (!multiple && files.length > 1) {
      setValue(name, null);
      setFileNames([]);
      return;
    }

    const validationError = validateFiles(files);
    if (validationError) {
      setValue(name, null);
      setFileNames([]);
      return;
    }

    setValue(name, multiple ? files : files[0], { shouldValidate: true });

    // Update file names for display
    const names = [];
    for (let i = 0; i < files.length; i++) {
      names.push(files[i].name);
    }
    setFileNames(names);
  };

  const clearFiles = () => {
    setValue(name, null, { shouldValidate: true });
    setFileNames([]);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel htmlFor={fileInputId}>
            <div className="flex items-center">
              {label}
              {required && <Required required={required} />}
            </div>
          </FormLabel>
          <FormControl>
            <div
              className={`relative border-2 border-dashed rounded-md p-6 transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-input"
              } ${fieldState.error ? "border-destructive" : ""} ${
                disabled ? "bg-muted cursor-not-allowed" : "cursor-pointer"
              } ${className}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={disabled ? undefined : handleDrop}
              onClick={
                disabled
                  ? undefined
                  : () => document.getElementById(fileInputId)?.click()
              }
              aria-invalid={!!fieldState.error}
            >
              <input
                id={fileInputId}
                type="file"
                className="sr-only"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={handleChange}
                aria-invalid={!!fieldState.error}
                aria-required={required}
                {...props}
              />
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <LucideUpload className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">{helpText}</div>
                {maxSize && (
                  <div className="text-xs text-muted-foreground">
                    Maximum file size: {formatBytes(maxSize)}
                  </div>
                )}
                {accept && (
                  <div className="text-xs text-muted-foreground">
                    Accepted formats: {accept.split(",").join(", ")}
                  </div>
                )}
              </div>

              {fileNames.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">Selected files:</div>
                  <ul className="space-y-1">
                    {fileNames.map((name, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between text-sm bg-background/50 p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <LucideFile className="h-4 w-4" />
                          <span>{name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearFiles();
                          }}
                          disabled={disabled}
                          aria-label={`Remove ${name}`}
                        >
                          <LucideX className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

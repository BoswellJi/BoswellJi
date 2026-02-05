declare interface Window {
  onSuccess: (response: string, type: string) => Promise<void>;
}

export function getAiAvatarUrl(seed: string): string {
  const encoded = encodeURIComponent(seed);
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encoded}&backgroundColor=transparent&size=256`;
}

export const translateToMessage = (intent: { value: string; confidence: number; } | null, entities: { value: string; name: string; role?: string; confidence: number; }[]): string => {
    return "No answer";
}
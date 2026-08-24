export const showPreviewText = (text, wordsPreview = 4) => {
    const splitText = text.split(" ");
    const previewText = splitText.slice(0, wordsPreview).join(" ");

    return splitText.length > wordsPreview ? previewText + "..." : previewText;
}
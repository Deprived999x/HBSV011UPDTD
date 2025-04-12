// ======= DEFENSIVE FINALIZED FUNCTION: generateNaturalLanguageDescription =======

function generateNaturalLanguageDescription(data) {
    try {
        let genderRaw = data?.["Gender"] || "Unknown";
        let age = data?.["Age"] || "Unknown";

        let gender;
        if (age === "Teenage" || age === "Pre-adolescent Child") {
            gender = genderRaw.toLowerCase().includes("male") ? "boy" : "girl";
        } else {
            gender = genderRaw.toLowerCase().includes("male") ? "man" : "woman";
        }

        const heritage = data?.["Visual Heritage"] || "Unknown";
        const build = ((data?.["Build Intensity"] || "") + " " + (data?.["Build"] || "")).trim();
        const height = data?.["Height"] || "Unknown";
        const skin = ((data?.["Skin Tone Intensity"] || "") + " " + (data?.["Skin Tone"] || "")).trim();
        const skinTexture = ((data?.["Skin Texture Visibility"] || "") + " " + (data?.["Skin Texture"] || "")).trim();
        const headShape = data?.["Head Shape"] || "Unknown";
        const eyeColor = ((data?.["Eye Color Intensity"] || "") + " " + (data?.["Eye Color"] || "")).trim();
        const hairColor = ((data?.["Hair Color Tone"] || "") + " " + (data?.["Hair Color"] || "")).trim();
        const hairTexture = ((data?.["Hair Quality"] || "") + " " + (data?.["Hair Texture"] || "")).trim();
        const hairLength = data?.["Hair Length"] || "Unknown";

        let desc = `An ${age.toLowerCase()} ${gender} of ${heritage.toLowerCase()} with a ${build.toLowerCase()} build, ${height.toLowerCase()} height, and ${skin.toLowerCase()} skin with ${skinTexture.toLowerCase()} texture. `;
        desc += `They have a ${headShape.toLowerCase()} head shape, ${eyeColor.toLowerCase()} eyes, and ${hairLength.toLowerCase()} ${hairTexture.toLowerCase()} hair colored ${hairColor.toLowerCase()}.`;

        return refineDescriptionStyle(desc);
    } catch (e) {
        return "[Error during generation: " + e.message + "]";
    }
}

function refineDescriptionStyle(text) {
    text = text.replace(/\b(\w+)\s+\1\b/g, '$1');
    text = text.replace(/\ba ([aeiouAEIOU])/g, 'an $1');
    text = text.replace(/\ban ([^aeiouAEIOU])/g, 'a $1');
    text = text.replace("textured mature texture", "mature skin texture");
    text = text.replace("normal textured texture", "normal skin texture");
    text = text.replace(/(\w+ length) (\w+) (\w+) hair/, '$1 $3 $2 hair');
    text = text.trim();
    if (!text.endsWith(".")) text += ".";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

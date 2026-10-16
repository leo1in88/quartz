```dataviewjs
const pages = dv.pages('"Art Design"').filter(p => p.file.name != dv.current().file.name);

dv.table(["Thumbnail", "Name"], 
    pages.map(p => {
        // Use Dataview's internal 'embeds' list to find the first image
        const img = p.file.embeds.find(e => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(e.path));
        
        return [
            // dv.fileLink(path, embed?, display?)
            // Setting 'true' as the second argument forces it to render as an image
            img ? dv.fileLink(img.path, true, "100") : "No Image", 
            p.file.link
        ];
    })
);
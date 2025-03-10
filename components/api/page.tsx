"use client";
import { useEffect, useState } from "react";

async function GetData() {
    const searchquery = prompt("Enter your search query:");
    const url = `https://images-api.nasa.gov/search?q=${searchquery}&page=1&media_type=image&year_start=1920&year_end=2025`;
    const res = await fetch(url);
    const data = await res.json();
    const images = data.collection.items.map((links: any) => {
        try {
            return JSON.parse(links.links[0].href).href;
        } catch (e) {
            console.log("error:", e);
        }
        return links.links[0].href;
    });
    console.log(images);
    return {
        body: images
    };
}


export default function ImageGet() {
    const [data, setData] = useState<{ body: any[] }>({ body: [] });

    useEffect(() => {
        async function fetchData() {
            const result = await GetData();
            setData(result);
        }
        fetchData();
    }, []);

    console.log(data);
    return (
        <div className="grid md:grid-cols-5 gap-4 grid-cols-1">
            {data.body.map((image, index) => (
                <div key={index}>
                    <img src={image} className="w-[30rem] h-96 rounded-lg" />
                </div>
            ))}
        </div>
    );
}
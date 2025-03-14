"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

async function GetData() {
    const searchquery = prompt("Enter your search query:");
    const url = `https://images-api.nasa.gov/search?q=${searchquery}&page=1&media_type=image&year_start=1920&year_end=2025`;
    const res = await fetch(url);
    const data = await res.json();
    const images = data.collection.items.map((item: any) => {
        try {
            return item.links[0].href;
        } catch (e) {
            console.log("error:", e);
        }
        return item.links[0].href;
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
                    <Image alt="image" src={image} width={500} height={500} className="w-[30rem] h-80 rounded-lg" />
                </div>
            ))}
        </div>
    );
}
import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
//CREATE NEW INTERPRETATION
async function createInterpretation(data: {term: string, interpretation:
    string}) {
        try {
            const response = await database.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                "interpretations", ID.unique(), data);
                return response;
        } catch (error) {
           console.error("ERROR CREATING INTERPRETATION", error);
           throw new Error("Failed to create new interpretation");
        }
    }
//Fetch Interpretations
    async function fetchInterpretations() {
            try {
                const response = await database.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                    "interpretations", 
                    [Query.orderDesc("$createdAt")]
                );
                    return response.documents;
            } catch (error) {
               console.error("ERROR FETCHING INTERPRETATION", error);
               throw new Error("Failed to fetch new interpretation");
            }
        }

export async function POST(req: Request){
    try {
        const {term, interpretation} = await req.json();
        const data = {term, interpretation};
        const response = await createInterpretation(data);
        return NextResponse.json({message: "Interpretation created successfully"});
    } catch (error) {
        return NextResponse.json({
            error: "Failed to create interpretation",
        },
    {status: 500}
    );
    }
}
export async function GET(){
    try {
        const interpretations = await fetchInterpretations();
    return NextResponse.json(interpretations);
    } catch (error) {
        return NextResponse.json(
            {
            error: "Failed to fetch interpretations"
        },
        {status: 500}
    );
    }
    

}

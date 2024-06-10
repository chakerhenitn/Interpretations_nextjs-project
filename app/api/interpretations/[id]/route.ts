import client from "@/lib/appwrite_client";
import { Databases} from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//Fetch a specific interpretation

async function fetchInterpretation(id: string){
    try {
        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                "interpretations", id
        );
        return interpretation;
    } catch (error) {
      console.error("Error fetching interpretation", error);
      throw new Error("Failed to fetcy interpretation");  
    }
}

//Delete specific interpretation
async function deleteInterpretation(id: string){
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                "interpretations", id
        );
    } catch (error) {
        console.error("Error deleting interpretation", error);
      throw new Error("Failed to delete interpretation");
    }
}

//Update specific interpretation
async function updateInterpretation(id: string, data: {
    term: string, interpretation: string}){
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                "interpretations", id, data
        );
    } catch (error) {
        console.error("Error update interpretation", error);
      throw new Error("Failed to update interpretation");
    }
}
/////////////////////Functions //////////////////////
//Fetch function
export async function GET(
    req:Request,
    {params}: {params: {id: string}}
)
{
    try {
       const id = params.id;
       const interpretation = await fetchInterpretation(id);
       return NextResponse.json({interpretation}); 
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to fetch interpretation"},
            {status: 500}
        );
    }
}
//Delete function
export async function DELETE(
    req:Request,
    {params}: {params: {id: string}}
)
{
    try {
       const id = params.id;
      await deleteInterpretation(id);
       return NextResponse.json({message: "Interpretation is deleted"}); 
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to delete interpretation"},
            {status: 500}
        );
    }
}
// update function
export async function PUT(
    req:Request,
    {params}: {params: {id: string}}
)
{
    try {
       const id = params.id;
       const interpretation = await req.json();
       await updateInterpretation(id, interpretation);
       return NextResponse.json({message:"Interpretation updated with success"}); 
    } catch (error) {
        return NextResponse.json(
            {error:"Failed to update interpretation"},
            {status: 500}
        );
    }
}
"use server";
import {prisma} from "@/lib/prisma";

export async function getPortfolio() {
  return await prisma.project.findMany({
    select:{
        cover:true,
        id:true,
        name:true,
        description:true
    }
  });
}


export async function getCarousel(){
    return await prisma.carousel.findMany({
        select:{
            desc:true,
            path:true
        }
    })
}
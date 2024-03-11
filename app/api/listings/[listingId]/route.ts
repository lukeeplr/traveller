import { NextResponse } from "next/server"

import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/libs/prismadb"

type IParams = {
    listingId?: string
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
  ){
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('ID Inválido')
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)

    }
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

type IParams = {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    
    const currentUser = await getCurrentUser(); 
    
    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Reserva inválida');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    })

    return NextResponse.json(reservation);

}
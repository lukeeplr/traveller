import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

type IUseFavorite = {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    
    const loginModal = useLoginModal();
    const router = useRouter();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success(hasFavorited ? 'Removido dos favoritos' : 'Adicionado aos favoritos')
        } catch (error) {
            toast.error('Algo deu errado!')
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited, 
        toggleFavorite
    }

} 


export default useFavorite

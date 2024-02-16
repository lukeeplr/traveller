import { GiBoatFishing, GiCastle, GiForestCamp, GiIsland, GiSurfBoard, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { PiCactusFill, PiSnowflakeBold } from "react-icons/pi";
import { TbBeach, TbPool } from "react-icons/tb";

export const categories = [
    {
        label: 'Praia',
        icon: TbBeach,
        description: 'Esse espaço fica perto da praia!'
    },
    {
        label: 'Fazendas',
        icon: GiWindmill,
        description: 'Esse espaço fica perto do campo!'
    },
    {
        label: 'Modernos',
        icon: MdOutlineVilla,
        description: 'Desfrute de uma arquitetura moderna!'
    },
    {
        label: 'Piscina',
        icon: TbPool,
        description: 'Esse espaço tem piscina!'
    },
    {
        label: 'Ilhas',
        icon: GiIsland,
        description: 'Esse espaço fica numa ilha!'
    },
    {
        label: 'Lagos',
        icon: GiBoatFishing,
        description: 'Esse espaço fica perto de um lago!'
    },
    {
        label: 'Castelos',
        icon: GiCastle,
        description: 'Esse espaço fica num castelo!'
    },
    {
        label: 'Acampamento',
        icon: GiForestCamp,
        description: 'Esse espaço é bom pra acampar!'
    },
    {
        label: 'Desertos',
        icon: PiCactusFill,
        description: 'Esse espaço é desértico!'
    },
    {
        label: 'Surfe',
        icon: GiSurfBoard,
        description: 'Esse espaço é bom pra surfar!'
    },
    {
        label: 'Neve',
        icon: PiSnowflakeBold,
        description: 'Esse espaço fica na neve!'
    },
]
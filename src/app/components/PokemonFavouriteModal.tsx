"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import PokemonFavouriteForm from "./PokemonFavouriteForm";
import { Pokemon } from "../types/pokemon";

interface PokemonFavouriteModalProps {
	pokemon: Pokemon;
	onSubmit: (nickname: string, description: string) => void;
}

export default function PokemonFavouriteModal({ pokemon, onSubmit }: PokemonFavouriteModalProps) {
	const [open, setOpen] = React.useState(false);

	const handleSubmit = (nickname: string, description: string) => {
		onSubmit(nickname, description);
		setOpen(false);
	};

	return (
		<div 
			className="mt-2"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
		>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger asChild>
					<button 
						className="w-full px-3 py-2 rounded-md text-white font-semibold transition-all duration-200 hover:opacity-90"
						style={{ backgroundColor: "#134686" }}
					>
						Agregar a favoritos
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay 
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
					/>
					<Dialog.Content 
						className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
						onInteractOutside={(e) => {
							e.preventDefault();
						}}
					>
						<Dialog.Title className="sr-only">Agregar a favoritos</Dialog.Title>
						<PokemonFavouriteForm pokemon={pokemon} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}

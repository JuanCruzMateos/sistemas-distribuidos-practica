"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { CSSProperties } from "react";
import { Pokemon } from "../types/pokemon";

interface PokemonFavouriteFormValues {
    nickname: string;
    description: string;
}

interface PokemonFavouriteFormProps {
    pokemon: Pokemon;
    onClose?: () => void;
    onSubmit: (nickname: string, description: string) => void;
}

const pokemonFavouriteSchema = Yup.object().shape({
    nickname: Yup.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede tener más de 50 caracteres")
        .required("Requerido"),
    description: Yup.string()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(100, "La descripción no puede tener más de 100 caracteres")
        .required("Requerido"),
});

export default function PokemonFavouriteForm({ pokemon, onClose, onSubmit }: PokemonFavouriteFormProps) {
    const initialValues: PokemonFavouriteFormValues = {
        nickname: "",
        description: "",
    };

    const handleSubmit = async (
        values: PokemonFavouriteFormValues
    ) => {
        console.log("Form submitted with values:", values);
        try {
            await onSubmit(values.nickname, values.description);
            console.log("onSubmit completed successfully");
            onClose?.();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h1
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: "#134686" }}
            >
                Agregar <span className="italic capitalize">{pokemon?.name}</span> a favoritos como...
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center">
                {pokemon?.name} es un pokemon de tipo {pokemon?.types.map((type) => type.type.name).join(", ")}
            </p>

            <Formik
                initialValues={initialValues}
                validationSchema={pokemonFavouriteSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, dirty, errors, values }) => {
                    console.log("Form state:", { isValid, dirty, errors, isSubmitting, values });

                    return (
                        <Form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="nickname"
                                    className="block text-sm font-semibold mb-2"
                                    style={{ color: "#134686" }}
                                >
                                    Nombre
                                </label>
                                <Field
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    placeholder="Como se llama tu Pokemon favorito?"
                                    className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 text-gray-900"
                                    style={{
                                        borderColor: "#feb21a",
                                        "--tw-ring-color": "#134686"
                                    } as CSSProperties}
                                />
                                <ErrorMessage name="nickname">
                                    {(msg) => (
                                        <div className="text-sm mt-1" style={{ color: "#ed3f27" }}>
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-semibold mb-2"
                                    style={{ color: "#134686" }}
                                >
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    placeholder="Descripción de tu Pokemon favorito"
                                    rows={4}
                                    className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 transition-all resize-none placeholder:text-gray-400 text-gray-900"
                                    style={{
                                        borderColor: "#feb21a",
                                        "--tw-ring-color": "#134686"
                                    } as CSSProperties}
                                />
                                <ErrorMessage name="description">
                                    {(msg) => (
                                        <div className="text-sm mt-1" style={{ color: "#ed3f27" }}>
                                            {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-md text-white font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: "#134686" }}
                                    onClick={() => handleSubmit(values)}
                                >
                                    {isSubmitting ? "Agregando a favoritos..." : "Agregar a favoritos"}
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
import { useLocalSearchParams } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import { petService } from "../database/petsService";
import { useEffect, useState } from "react";

const petScreen = () => {
    const params = useLocalSearchParams();
    const petServ = petService()
    const [pet, setPet] = useState<any>()
    const id = params.id;

    useEffect(() => {
        const buscarPet = async () => {
            const res = await (await petServ).getPetsById(Number(id))
            setPet(res)
        }
        buscarPet()
    }, [])
   
    return (
        <SafeAreaView style={styles.container}>
            <Button title="ALIMENTAR SEU BICHINHO" onPress={() => console.log(pet.nome)}/>
            <Button title="BRINCAR COM SEU BICHINHO" onPress={() => console.log(pet.nome)}/>
            <Button title="FAZER SEU BICHINHO DORMIR" onPress={() => console.log(pet.nome)}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#caffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 160,
        margin: 10,
        borderRadius: 10,
    },
});

export default petScreen;
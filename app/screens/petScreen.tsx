import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { petService } from "../database/petsService";
import { useEffect, useState } from "react";

const petScreen = () => {
    const params = useLocalSearchParams();
    const petServ = petService()
    const [pet, setPet] = useState<any>()
    const [gameModal, setGameModal] = useState(false)
    const [foodModal, setFoodModal] = useState(false)
    const id = params.id;

    const imageMapping: { [key: string]: any } = {
        '1': require('../../assets/images/pet1.png'),
        '2': require('../../assets/images/pet2.png'),
        '3': require('../../assets/images/pet3.png'),
        '4': require('../../assets/images/pet4.png'),
        '5': require('../../assets/images/pet5.png'),
        '6': require('../../assets/images/pet6.png'),
    };

    useEffect(() => {
        const buscarPet = async () => {
            const res = await (await petServ).getPetsById(Number(id))
            setPet(res)
        }
        buscarPet()
    }, [])
   
    return (
        <SafeAreaView style={styles.container}>
            <Modal
            animationType="fade"
            transparent={true}
            visible={gameModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Escolha um jogo</Text>
                        <TouchableOpacity onPress={() => {setGameModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🧠 Jogo da Memória</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Alert.alert("Aguarde..." , "Jogo em desenvolvimento")}>
                            <Text style={styles.modalOption}>Jogo 2</Text>
                        </TouchableOpacity>
                        <Button title="Fechar" onPress={() => setGameModal(false)} />
                    </View>
                </View>
            </Modal>

            <Modal
            animationType="fade"
            transparent={true}
            visible={foodModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Escolha uma comida:</Text>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🍇 +5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🍑 +5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🌭 +20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🥩 +15</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🍛 +25</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🍪 +10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🍰 +10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setFoodModal(false); router.push("./memory")}}>
                            <Text style={styles.modalOption}>🍹 +5</Text>
                        </TouchableOpacity>
                        <Button title="Fechar" onPress={() => setFoodModal(false)} />
                    </View>
                </View>
            </Modal>            

            <View style={styles.topSection}>
                <Text style={styles.title}>{pet ? pet.nome : "Carregando..."}</Text>
                <Image 
                source={pet ? imageMapping[pet.imageUri] : null} 
                style={styles.image}/>
            </View>


            <View style={styles.buttonContainer}>
                <Button title="🍇 Alimenta-lo" onPress={() => setFoodModal(true)} />
                <Button title="🎮 Brincar" onPress={() => setGameModal(true)} />
                <Button title="💤 Dormir" onPress={() => console.log(pet?.nome)} />
            </View>
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
    topSection: {
        flex: 1,
        justifyContent: 'flex-start', // Fixa o nome do bichinho no topo
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute', // Fixa os botões na parte inferior
        bottom: 30,           // Ajuste a distância da borda inferior
        paddingHorizontal: 20,
    },
    image: {
        width: 100,
        height: 160,
        margin: 10,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000075f',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    modalOption: {
        fontSize: 18,
        padding: 10,
        marginBottom: 10,
    },
});

export default petScreen;
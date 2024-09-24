import { router, useLocalSearchParams } from "expo-router";
import { Alert, Button, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { petService } from "../database/petsService";
import { useEffect, useState } from "react";

const petScreen = () => {
    const params = useLocalSearchParams();
    const petServ = petService()
    const [pet, setPet] = useState<any>([])
    const [gameModal, setGameModal] = useState(false)
    const [foodModal, setFoodModal] = useState(false)
    const [status, setStatus] = useState<string>()
    const id = Number(params.id)

    const imageMapping: { [key: string]: any } = {
        '3': require('../../assets/images/pet1.png'),
        '4': require('../../assets/images/pet2.png'),
        '5': require('../../assets/images/pet3.png'),
        '6': require('../../assets/images/pet4.png'),
        '7': require('../../assets/images/pet5.png'),
        '8': require('../../assets/images/pet6.png'),
    };
    
    const getStatus = async () => {
        const res = (await petServ).calcularStatus(pet.fome, pet.sono, pet.diversao)
        setStatus(res)
    }
    
    const buscarPet = async () => {
        const res = await (await petServ).getPetsById(Number(id))
        await setPet(res)
        getStatus()
    }

    useEffect(() => {
        buscarPet()
    }, [pet])
   
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
                        <TouchableOpacity onPress={() => {setGameModal(false); router.push("./maze")}}>
                            <Text style={styles.modalOption}>🕹️ Jogo do Labirinto</Text>
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
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 5, id); (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🍇 +5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 5, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🍑 +5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 20, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🌭 +20</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 15, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🥩 +15</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 25, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🍛 +25</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 10, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🍪 +10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 10, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
                            <Text style={styles.modalOption}>🍰 +10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {(await petServ).setFome(pet.fome + 5, id) ; (await petServ).setHoraFome(pet.id) ; buscarPet()}}>
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
                <Text>Energia: {pet.sono}</Text>
                <Text>Alimentação: {pet.fome}</Text>
                <Text>Diversão: {pet.diversao}</Text>
                <Text>Status: {status}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="🍇 Alimenta-lo" onPress={() => setFoodModal(true)} />
                <Button title="🎮 Brincar" onPress={() => setGameModal(true)} />
                <Button title="💤 Dormir" onPress={async () => {(await petServ).setStatus("Dormindo 💤💤💤" , pet.id) ; (await petServ).setHoraSono(pet.id) ; router.back() , Alert.alert("Dormindo 💤💤💤", "Seu Pet está dormindo agora, acesse novamente para acorda-lo.")}} />
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
        justifyContent: 'flex-start', 
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
        position: 'absolute', 
        bottom: 30,           
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
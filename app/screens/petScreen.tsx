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
        const res = (await petServ).calcularStatus(pet.fome, pet.sono, pet.diversao);
        setStatus(res);
    }
    
    const buscarPet = async () => {
        const res = await (await petServ).getPetsById(Number(id))
        await setPet(res)
        getStatus()
    }

    const mudarStatus = async () => {
        const res =  (await petServ).calcularStatus(pet.fome, pet.sono, pet.diversao);
        console.log(res!);
        (await petServ).setStatus(res!, id)
    }

    useEffect(() => {
        buscarPet();
    }, [pet])

    useEffect(() => {
        mudarStatus()
    }, [status])
   
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
                <Text style={styles.StatusText}>Status: {status}</Text>
                <Image 
                source={pet ? imageMapping[pet.imageUri] : null} 
                style={styles.image}/>
                <Text style={styles.atributosText}>Energia 💪🏻: {pet.sono}</Text>
                <Text style={styles.atributosText}>Alimentação 🍔: {pet.fome}</Text>
                <Text style={styles.atributosText}>Diversão 😁: {pet.diversao}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="🍇 Alimenta-lo" onPress={() => { 
                    if (pet.fome < 100) { 
                        setFoodModal(true) 
                    }else{
                        Alert.alert("Atenção!", "Você já alimentou seu pet o suficiente.") }}} />
                <Button title="🎮 Brincar" onPress={() => { 
                    if (pet.sono < 20) { 
                        Alert.alert("Atenção!", "Seu pet está com sono, ele precisa dormir.")
                    }else{
                        setGameModal(true)  }}} />
                <Button title="💤 Dormir" onPress={async () => {(await petServ).setStatus("Dormindo 💤💤💤" , pet.id) ; (await petServ).setHoraSono(pet.id) ; router.back() , Alert.alert("Dormindo 💤", "Seu Pet está dormindo agora, acesse novamente para acorda-lo.")}} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffe6',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    topSection: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        color: '#000000',
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 10,
        textAlign: 'center',
    },
    StatusText: {
        color: '#000000',
        fontSize: 30,
        textAlign: 'center',
    },
    atributosText: {
        color: '#000000',
        fontSize: 30,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute', 
        bottom: 30,           
        paddingHorizontal: 20,
    },
    image: {
        width: 250,
        height: 380,
        margin: 10,
        borderRadius: 10,
        marginTop: 50
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
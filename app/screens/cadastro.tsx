import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { petService } from "../database/petsService";

const images = [
    require('../../assets/images/pet1.png'),
    require('../../assets/images/pet2.png'),
    require('../../assets/images/pet3.png'),
    require('../../assets/images/pet4.png'),
    require('../../assets/images/pet5.png'),
    require('../../assets/images/pet6.png')
];

const Cadastro = () => {
    const router = useRouter();
    const cadastroPet = petService();
    const [selectedImage, setSelectedImage] = useState<string>();
    const [nomebichinho, setNomeBichinho] = useState<string>();
    
    const imageBichinho = (image : string) => {
        setSelectedImage(image)
    }

    const renderItem = ({ item } : {item : any}) => {
        return (
            <TouchableOpacity 
            onPress={() => imageBichinho(item)}>
            <Image
            source={item}
            style={[
                styles.image,
                { borderWidth: selectedImage === item ? 2 : 0, borderColor: 'blue' }
            ]}/>
        </TouchableOpacity>
        )
    };

    const cadastrar = async () => {
        try {
            (await cadastroPet).cadastrarPet({
            nome: nomebichinho!, 
            fome: 100, 
            sono: 100, 
            diversao: 100, 
            imageUri: selectedImage!
            });
            Alert.alert("Cadastrado!", "Bichinho cadastrado com sucesso.")
            router.back()
        } catch (error) {
            Alert.alert("Erro!", "Erro ao cadastrar!")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Cadastro do Bichinho</Text>
                <Text>Digite o nome do bichinho:</Text>
                <TextInput 
                    maxLength={10} 
                    clearTextOnFocus={true}
                    style={styles.textInput}
                    onChangeText={(value) => setNomeBichinho(value)}
                    placeholder="Nome do Bichinho">
                    </TextInput>
                <Text>Selecione a Imagem:</Text>
                <FlatList
                data={images}
                renderItem={renderItem}
                numColumns={3}
                />
                <Button title="Salvar" onPress={cadastrar} />
                <Button title="Voltar" onPress={() => router.back()} />
                
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
    title: {
        color: '#000000',
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        height: 50,
        width: 200,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        margin: 10,
        backgroundColor: '#fff'
    },
    image: {
        width: 100,
        height: 160,
        margin: 10,
        borderRadius: 10,
    },
});

export default Cadastro;

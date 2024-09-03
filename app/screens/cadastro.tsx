import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, Image } from "react-native";

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
    const [selectedImage, setSelectedImage] = useState<string>();

    const imageBichinho = (image : string) => {
        setSelectedImage(image)
    }

    const renderItem = ({ item } : {item : any}) => {

        return (
        <TouchableOpacity 
        onPress={() => imageBichinho(item)}>
            <Image
            source={item}
            style={styles.image}/>
        </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Cadastro do Bichinho</Text>
                <Text>Digite o nome do seu bixinho:</Text>
                <TextInput 
                    maxLength={10} 
                    clearTextOnFocus={true}
                    style={styles.textInput}
                >Nome do Bichinho</TextInput>
                <Text>Selecione a Imagem:</Text>
                <FlatList
                data={images}
                renderItem={renderItem}
                numColumns={3}
                />
                <Button title="Salvar" onPress={() => alert('Bichinho cadastrado!')} />
                <Button title="Voltar" onPress={() => router.back()} />
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffdaee',
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

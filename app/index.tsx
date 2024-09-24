import { useRouter } from "expo-router";
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { petService } from "./database/petsService";
import { useEffect, useState } from "react";

interface Pet {
    id: number;
    nome: string;
    fome: number;
    sono: number;
    diversao: number;
    imageUri: string;
    status: string
}

const index = () => {
    const petServ = petService();
    const router = useRouter();
    const [listaPets, setListaPets] = useState<Pet[]>([])

    const imageMapping: { [key: string]: any } = {
        '3': require('../assets/images/pet1.png'),
        '4': require('../assets/images/pet2.png'),
        '5': require('../assets/images/pet3.png'),
        '6': require('../assets/images/pet4.png'),
        '7': require('../assets/images/pet5.png'),
        '8': require('../assets/images/pet6.png'),
    };
    
    const listPets = async () => {
        const res = await (await petServ).getPets()
        setListaPets(res as Pet[])
        console.log(res)

    }
    
    useEffect(() => {
        listPets()
    },[])
    
    type ItemProps = {
        id: number,
        nome: string,
        imagem: string,
        status: string
    }
    
    const Item = ({id, nome, imagem, status}: ItemProps) => {
        return(
            <TouchableOpacity 
            style={styles.item}
            onPress={async () => {
                router.push({
                    pathname: "/screens/petScreen",
                    params: {
                        id: id
                    }
            })
            }}>
            <Image source={imagem ? imageMapping[imagem] : null} style={{width: 230, height: 420}}/>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.textoStatus}>{status}</Text>
            </TouchableOpacity>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/images/icon.png')} style={{ width: 80, height: 80, alignSelf: "center" }} />
            <View style={styles.containerContent}>
            <Text style={styles.titleText}>Selecione seu Bichinho ❤️</Text>
                <FlatList
                data={listaPets}
                renderItem={({item}) => <Item nome={item.nome} id={item.id} imagem={item.imageUri} status={item.status}/>}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                />
            </View>
            <Button title="CADASTRAR BICHINHO" onPress={() => router.push("/screens/cadastro")}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00ffff',
        flex: 1
    },
    containerContent: {
        backgroundColor: '#caffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",

    },
    titleText: {
        color: '#000000',
        fontSize: 25,
        fontWeight: "500",
        marginTop: 50,

    },
    texto: {
        color: '#000000',
        fontSize: 25,
        fontWeight: "300",
        padding: 20,
    },
    textoStatus: {
        color: '#000000',
        fontSize: 25,
        fontWeight: "200",
    },
    flatListContainer: {
        justifyContent: 'center',
        alignItems: "center",
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 250,
        height: 300,
        justifyContent: "center",
        alignItems: "center"
      },
      title: {
        fontSize: 32,
      },

})

export default index;
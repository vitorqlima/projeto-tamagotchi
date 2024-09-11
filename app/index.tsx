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
}


const index = () => {
    const petServ = petService();
    const router = useRouter();
    const [listaPets, setListaPets] = useState<Pet[]>([])

    useEffect(() => {
        const listPets = async () => {
            const res = await (await petServ).getPets()
            setListaPets(res as Pet[])
        }

        listPets()
    },[])
    
    type ItemProps = {
        id: number,
        nome: string
    }
    
    const Item = ({id, nome}: ItemProps) => {
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
            <Text style={styles.title}>{nome}</Text>
            </TouchableOpacity>
        );
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/images/icon.png')} style={{ width: 80, height: 80, alignSelf: "center" }} />
            <View style={styles.containerContent}>
                <FlatList
                data={listaPets}
                renderItem={({item}) => <Item nome={item.nome} id={item.id}/>}
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
    texto: {
        color: '#000000',
        fontSize: 25,
        fontWeight: "300",
        padding: 20,
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
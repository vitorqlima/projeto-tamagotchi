import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const data = [
    {title: 'Cadastrar Bichinho'},
]

type ItemProps = {
    title: string
}

const Item = ({title}: ItemProps) => {
    return(
        <TouchableOpacity 
        style={styles.item}
        onPress={() => {
            alert("Cadastro iniciado")
        }}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/images/icon.png')} style={{ width: 80, height: 80, alignSelf: "center" }} />
            <View style={styles.containerContent}>
                <FlatList
                data={data}
                renderItem={({item}) => <Item title={item.title}/>}
                horizontal={true}
                contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cf5197',
        flex: 1
    },
    containerContent: {
        backgroundColor: '#ffdaee',
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
        backgroundColor: '#cf51968d',
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
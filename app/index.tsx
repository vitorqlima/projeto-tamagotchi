import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const index = () => {


    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('./icon.png')} style={{ width: 80, height: 80, alignSelf: "center" }} />
            <View style={styles.containerContent}>
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
        alignItems: "center"

    },
    texto: {
        color: '#000000',
        fontSize: 25,
        fontWeight: "300",
        padding: 20,
    },

})


export default index;
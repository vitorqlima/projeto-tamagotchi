import { useSQLiteContext } from "expo-sqlite"

export const petService = async () => {
    const database = useSQLiteContext()
    
    const cadastrarPet = async ({nome, fome, sono, diversao, imageUri} : {nome: string, fome: number, sono: number, diversao: number, imageUri: string}) => {
        const query = await database.prepareAsync(`
            INSERT INTO Pets (nome, fome, sono, diversao, imageUri) VALUES (
            $nome, $fome, $sono, $diversao, $imageUri)`)
        try {
            await query.executeAsync({$nome: nome, $fome: fome, $sono: sono, $diversao: diversao, $imageUri: imageUri})
            console.log("Pet cadastrado!")
        } catch (error) {
            console.log("Ocorreu um erro.")
        }finally{
            await query.finalizeAsync()
        }
    }

    async function getPets() {
        try {
            const res = await database.getAllAsync(`SELECT * FROM Pets`)
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async function getPetsById(id : number) {
        const query = await database.prepareAsync(`SELECT * FROM Pets WHERE id = ?`)
        try {
            const res = await query.executeAsync(id)
            const firstRow = await res.getFirstAsync()
            return firstRow
        } catch (error) {
            console.log(error)
        }
    }

    return { cadastrarPet, getPets, getPetsById}
    
}
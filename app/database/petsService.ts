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
        }finally {
            await query.finalizeAsync()
        }
    }

    async function setFome(fome: number , id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET fome = $fome WHERE id = $id`);
        try {
            await query.executeAsync({$fome: fome , $id: id})
            console.log("Fome Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    async function setSono(sono: number , id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET sono = $sono WHERE id = $id`);
        try {
            await query.executeAsync({$sono: sono , $id: id})
            console.log("sono Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    async function setDiversao(diversao: number , id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET diversao = $diversao WHERE id = $id`);
        try {
            await query.executeAsync({$diversao: diversao , $id: id})
            console.log("diversao Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    async function setStatus(status: string , id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET status = $status WHERE id = $id`);
        try {
            await query.executeAsync({$status: status , $id: id})
            console.log("Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    async function setHoraSono(id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET horaSono = $hora WHERE id = $id`);
        try {
            await query.executeAsync({$hora: Date() , $id: id})
            console.log("Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    async function setHoraFome(id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET horaFome = $hora WHERE id = $id`);
        try {
            await query.executeAsync({$hora: Date() , $id: id})
            console.log("Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    async function setHoraDiversao(id: number) {
        const query = await database.prepareAsync(`UPDATE Pets SET horaDiversao = $hora WHERE id = $id`);
        try {
            await query.executeAsync({$hora: Date() , $id: id})
            console.log("Atualizado")
        } catch (error) {
            console.log("Erro ao atualizar")
        }finally {
            await query.finalizeAsync()
        }
        
    }

    const calcularStatus = (fome: number, sono: number, diversao: number) => {
        const somaAtributos = fome + sono + diversao;

        if (somaAtributos === 0) {
            return "Morto 😵";
        } else if (somaAtributos >= 1 && somaAtributos <= 50) {
            return "Crítico 😣";
        } else if (somaAtributos >= 51 && somaAtributos <= 100) {
            return "Muito triste 😭";
        } else if (somaAtributos >= 101 && somaAtributos <= 150) {
            return "Triste 😪";
        } else if (somaAtributos >= 151 && somaAtributos <= 200) {
            return "Ok 😐";
        } else if (somaAtributos >= 201 && somaAtributos <= 250) {
            return "Bem 🙂";
        } else if (somaAtributos >= 251) {
            return "Muito bem 😀";
        }
    };

    return { cadastrarPet, getPets, getPetsById, setFome, setSono, setDiversao, setStatus, calcularStatus, setHoraSono, setHoraFome, setHoraDiversao}
    
}
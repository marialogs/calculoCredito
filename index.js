import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { calcularCredito } from "../calcularCredito";

export default function Index() {
  const [renda, setRenda] = useState("");
  const [idade, setIdade] = useState("");
  const [clt, setClt] = useState(false);
  const [divida, setDivida] = useState(false);
  const [resultado, setResultado] = useState("");
  const [aprovado, setAprovado] = useState(false);

  function consultar() {
    const rendaNumero = Number(renda.replace(",", "."));
    const idadeNumero = Number(idade);

    if (
      renda === "" ||
      idade === "" ||
      isNaN(rendaNumero) ||
      isNaN(idadeNumero) ||
      rendaNumero <= 0 ||
      idadeNumero < 0
    ) {
      setAprovado(false);
      setResultado("Preencha a renda e a idade com números válidos.");
      return;
    }

    const credito = calcularCredito(rendaNumero, idadeNumero, clt, divida);

    if (credito.aprovado) {
      const valorFormatado = credito.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const percentualFormatado = String(credito.percentual).replace(".", ",");

      setAprovado(true);
      setResultado(
        "CRÉDITO APROVADO\nPercentual: " +
          percentualFormatado +
          "%\nValor máximo: " +
          valorFormatado
      );
    } else {
      setAprovado(false);
      setResultado("SEM DIREITO A CRÉDITO");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consulta de Crédito</Text>

      <Text style={styles.rotulo}>Renda anual (R$)</Text>
      <TextInput
        style={styles.campo}
        value={renda}
        onChangeText={setRenda}
        keyboardType="numeric"
        placeholder="Ex: 20000"
      />

      <Text style={styles.rotulo}>Idade</Text>
      <TextInput
        style={styles.campo}
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        placeholder="Ex: 23"
      />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Possui vínculo CLT?</Text>
        <Switch value={clt} onValueChange={setClt} />
      </View>

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Possui dívida?</Text>
        <Switch value={divida} onValueChange={setDivida} />
      </View>

      <Button title="Consultar" onPress={consultar} />

      {resultado !== "" && (
        <Text
          style={[
            styles.resultado,
            aprovado ? styles.verde : styles.vermelho,
          ]}
        >
          {resultado}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 16,
    marginBottom: 5,
  },
  campo: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  resultado: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "bold",
  },
  verde: {
    color: "green",
  },
  vermelho: {
    color: "red",
  },
});

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";

function SelectableButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
    >
      <Text style={selected ? styles.optionTextSelected : styles.optionText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function PetAdoptionForm() {
  // --- Dados adotante ---
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  // --- Preferências ---
  const [especie, setEspecie] = useState("");
  const [sexo, setSexo] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");

  // Validação de email simulada
  const validarEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      setTimeout(() => setEmailValid(true), 800);
    } else {
      setEmailValid(false);
    }
  };

  // Verificação de formulário
  const formValido =
    nome &&
    emailValid &&
    telefone &&
    nascimento &&
    senha &&
    senha === confirmaSenha &&
    especie &&
    sexo &&
    idade &&
    porte;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cadastro para Adoção 🐾</Text>

      <Text style={styles.section}>Seus Dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        onBlur={validarEmail}
        keyboardType="email-address"
      />
      {!emailValid && email.length > 0 && (
        <Text style={styles.error}>E-mail inválido!</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Celular (99) 99999-9999"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={nascimento}
        onChangeText={setNascimento}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
        secureTextEntry
      />

      <Text style={styles.section}>Preferências do Pet</Text>

      <Text style={styles.label}>Espécie:</Text>
      <View style={styles.row}>
        <SelectableButton label="Cachorro" selected={especie === "cachorro"} onPress={() => setEspecie("cachorro")} />
        <SelectableButton label="Gato" selected={especie === "gato"} onPress={() => setEspecie("gato")} />
      </View>

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.row}>
        <SelectableButton label="Macho" selected={sexo === "macho"} onPress={() => setSexo("macho")} />
        <SelectableButton label="Fêmea" selected={sexo === "femea"} onPress={() => setSexo("femea")} />
      </View>

      <Text style={styles.label}>Idade:</Text>
      <View style={styles.row}>
        <SelectableButton label="Filhote" selected={idade === "filhote"} onPress={() => setIdade("filhote")} />
        <SelectableButton label="Adulto" selected={idade === "adulto"} onPress={() => setIdade("adulto")} />
        <SelectableButton label="Idoso" selected={idade === "idoso"} onPress={() => setIdade("idoso")} />
      </View>

      <Text style={styles.label}>Porte:</Text>
      <View style={styles.row}>
        <SelectableButton label="Pequeno" selected={porte === "pequeno"} onPress={() => setPorte("pequeno")} />
        <SelectableButton label="Médio" selected={porte === "medio"} onPress={() => setPorte("medio")} />
        <SelectableButton label="Grande" selected={porte === "grande"} onPress={() => setPorte("grande")} />
      </View>

      <TouchableOpacity
        style={[styles.button, !formValido && styles.buttonDisabled]}
        disabled={!formValido}
        onPress={() => Alert.alert("Sucesso!", "Cadastro concluído 🎉")}
      >
        <Text style={styles.buttonText}>Quero Adotar!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#2c3e50" },
  section: { fontSize: 20, fontWeight: "600", marginTop: 20, marginBottom: 10, color: "#34495e" },
  label: { fontSize: 16, fontWeight: "500", marginTop: 10, marginBottom: 5, color: "#555" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    elevation: 2, // sombra leve Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  error: { color: "red", fontSize: 13, marginBottom: 5 },
  row: { flexDirection: "row", flexWrap: "wrap", marginVertical: 5 },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    margin: 5,
    backgroundColor: "#fff",
  },
  optionSelected: { backgroundColor: "#27ae60", borderColor: "#27ae60" },
  optionText: { color: "#333", fontSize: 15 },
  optionTextSelected: { color: "#fff", fontWeight: "bold" },
  button: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#95a5a6" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

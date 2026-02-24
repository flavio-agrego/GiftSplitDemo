import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { auth, db } from '../firebase/config'

export default function RegisterScreen({ navigation }) {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {

    if (!nombre || !email || !password) {
      alert('Completá todos los campos')
      return
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Rol fijo DEMO
      await set(ref(db, 'users/' + firebaseUser.uid), {
        nombre,
        email,
        role: 'regalador'
      })

      alert('Cuenta creada correctamente')
      navigation.navigate('Login')

    } catch (error) {
      alert('Error al registrar')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>Crear cuenta</Text>

        <View style={styles.demoBadge}>
          <Text style={styles.demoText}>
            DEMO PARA CODERHOUSE · Solo rol REGALADOR habilitado
          </Text>
        </View>

        <TextInput
          placeholder="Tu nombre"
          style={styles.input}
          onChangeText={setNombre}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Ya tengo cuenta</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    justifyContent: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    elevation: 4
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  demoBadge: {
    backgroundColor: '#ffeaa7',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  demoText: {
    fontSize: 12,
    color: '#2d3436',
    fontWeight: '600',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#6c5ce7',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600'
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#6c5ce7'
  }
})
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { clearUser } from '../../redux/userSlice'
import { ref, set, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { guardarReservaLocal } from '../database/localDB'

export default function BuscarListasScreen() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [regalos, setRegalos] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {

    const regalosRef = ref(db, 'demoRegalos')

    const unsubscribe = onValue(regalosRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const lista = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        setRegalos(lista)
      }
    })

    return () => unsubscribe()

  }, [])

  const handleReservar = async (item) => {

    if (item.reservadoPor) {
      alert('Este regalo ya fue reservado')
      return
    }

    try {

      setLoadingId(item.id)

      // Permiso ubicación
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        alert('Se necesita permiso de ubicación para reservar')
        setLoadingId(null)
        return
      }

      // Obtener ubicación
      const location = await Location.getCurrentPositionAsync({})
      const lat = location.coords.latitude
      const lng = location.coords.longitude

      // Guardar en Firebase
      await set(ref(db, 'demoRegalos/' + item.id), {
        ...item,
        reservadoPor: user.nombre,
        lat,
        lng,
        fechaReserva: new Date().toISOString()
      })

      // Guardar en SQLite
      guardarReservaLocal(
        item.id,
        item.nombre,
        user.nombre,
        lat,
        lng
      )

    } catch (error) {
      alert('Error al reservar')
    } finally {
      setLoadingId(null)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    dispatch(clearUser())
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>GiftSplit Demo</Text>
        <Text style={styles.headerSubtitle}>
          Bienvenido/a {user.nombre}
        </Text>
      </View>

      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>Casamiento de Juan & Juana</Text>
        <Text style={styles.eventSubtitle}>
          15 de Noviembre 2026 · Buenos Aires
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Lista de regalos disponibles
      </Text>

      <FlatList
        data={regalos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.giftCard}>

            <View style={{ flex: 1 }}>
              <Text style={styles.giftName}>{item.nombre}</Text>

              {item.reservadoPor ? (
                <>
                  <Text style={styles.reservado}>
                    Reservado por {item.reservadoPor}
                  </Text>
                  <Text style={styles.locationTag}>
                    📍 Ubicación registrada
                  </Text>
                </>
              ) : (
                <Text style={styles.disponible}>
                  Disponible
                </Text>
              )}
            </View>

            {!item.reservadoPor && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleReservar(item)}
                disabled={loadingId === item.id}
              >
                {loadingId === item.id ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Reservar</Text>
                )}
              </TouchableOpacity>
            )}

          </View>
        )}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    padding: 20
  },

  header: {
    marginBottom: 20
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3436'
  },

  headerSubtitle: {
    color: '#636e72',
    marginTop: 4
  },

  eventCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    elevation: 4
  },

  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436'
  },

  eventSubtitle: {
    marginTop: 6,
    color: '#636e72'
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2d3436'
  },

  giftCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3
  },

  giftName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436'
  },

  disponible: {
    marginTop: 6,
    color: '#00b894',
    fontWeight: '500'
  },

  reservado: {
    marginTop: 6,
    color: '#d63031',
    fontWeight: '500'
  },

  locationTag: {
    fontSize: 12,
    color: '#0984e3',
    marginTop: 2
  },

  button: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10
  },

  buttonText: {
    color: 'white',
    fontWeight: '600'
  },

  logoutButton: {
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d63031',
    alignItems: 'center'
  },

  logoutText: {
    color: '#d63031',
    fontWeight: '600'
  }

})
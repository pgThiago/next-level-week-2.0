import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8257e5',
        padding: 20
    }, 
    
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
    },

    header: {
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 24,
        lineHeight: 32,
        marginVertical: 5,
    },

    subTitle: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 32,
        marginVertical: 20,
        marginBottom: 40,
    }
});

export default styles;
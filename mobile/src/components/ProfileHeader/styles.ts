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
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 70,
        backgroundColor: 'red',
    },

    profileName: {
        color: '#fff',
        fontSize: 18,
    },

    profileSubject: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 40,
    },
});

export default styles;
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../assets/data/colors';

const width = Dimensions.get('screen').width / 2 - 30;

const Card = ({ navigation, product }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Detail', product)}
        >
            <View style={styles.card}>
                <View style={{ alignItems: 'flex-end' }}>
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: product.like
                                ? 'rgba(245, 42, 42,0.2)'
                                : 'rgba(0,0,0,0.2)',
                        }}
                    >
                        <Icon
                            name='favorite'
                            size={18}
                            color={product.like ? COLORS.red : COLORS.dark}
                        />
                    </View>
                </View>
                <View style={styles.imageWrapper}>
                    <Image
                        style={{
                            flex: 1,
                            width: 120,
                            resizeMode: 'cover',
                            marginTop: -30,
                        }}
                        source={product.img}
                    />
                </View>
                <Text
                    style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}
                >
                    {product.name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        ${product.price}
                    </Text>
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            backgroundColor: COLORS.red,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: COLORS.white,
                                fontWeight: 'bold',
                            }}
                        >
                            +
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 270,
        backgroundColor: COLORS.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
    },
    imageWrapper: {
        alignItems: 'center',
        height: 150,
    },
});

export default Card;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../assets/data/colors.js';

const CategoriesBar = () => {
    const [categoryIndex, setCategoryIndex] = useState(0);

    const categories = ['POPULAR', 'BEST SALE', 'T-SHIRT', 'PANTS'];

    return (
        <View style={styles.categoryContainer}>
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => setCategoryIndex(index)}
                >
                    <Text
                        style={[
                            styles.categoryText,
                            categoryIndex === index &&
                                styles.categoryTextSelected,
                        ]}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 14,
        marginBottom: 14,
        justifyContent: 'space-between',
    },
    categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
    categoryTextSelected: {
        color: COLORS.red,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.red,
    },
});

export default CategoriesBar;

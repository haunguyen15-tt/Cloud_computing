import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import COLORS from '../assets/data/colors.js';

import { getAllCategories } from '../Service/apis/categories.js';

const CategoriesBar = ({ getProductsByCategory }) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [category, setCategory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getCategory = async () => {
        try {
          const res = await getAllCategories();
          setCategory([{ id: 'All', name: 'All' }, ...res.data.categorys]);
        } catch (e) {
          console.log(e.message);
        }
      };

      getCategory();

      return () => {
        setCategory([]);
      };
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.categoryContainer} horizontal bounces>
      {category.map((item, index) => (
        <TouchableOpacity
          style={{ width: 100, justifyContent: 'center', alignItems: 'center' }}
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            setCategoryIndex(index);
            getProductsByCategory(item._id);
          }}
        >
          <Text
            style={[styles.categoryText, categoryIndex === index && styles.categoryTextSelected]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
    borderColor: COLORS.red,
  },
});

export default CategoriesBar;

import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Product } from '../models/Models';

type Props = {
  onValidate?: (product: Product) => void
}

type RowProps = {
  title: string,
  onChange?: (value: string) => void
}

const Row = (props: RowProps) => {
  return (
    <View style={styles.row}>
      <Text>{props.title}</Text>
      <TextInput style={styles.input} onChangeText={props.onChange} />
    </View>
  )
}

export const ProductCreation = (props: Props) => {
  
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  return (
    <View>
      <Row title="Name" onChange={setName} />
      <Row title="Quantity" onChange={value => setQuantity(parseFloat(value))} />
      <Row title="Price" onChange={value => setPrice(parseFloat(value))} />
      <Button title="DONE" onPress={() => props.onValidate?.(new Product(name, quantity, price))} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  input: {
    flexGrow: 1
  }
})
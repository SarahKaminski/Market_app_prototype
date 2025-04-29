import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// Adicionei URLs de imagens para os produtos
const produtos = [
  {
    id: '1',
    nome: 'Arroz 5kg',
    preco: 15.99,
    descricao: 'Arroz tipo 1, pacote de 5kg. Grãos selecionados e de alta qualidade.',
    categoria: 'Alimentos básicos',
    imagem: 'https://m.media-amazon.com/images/I/71kFQCDCkBL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '2',
    nome: 'Feijão 1kg',
    preco: 7.50,
    descricao: 'Feijão carioca, pacote de 1kg. Rico em nutrientes e proteínas.',
    categoria: 'Alimentos básicos',
    imagem: 'https://www.paodeacucar.com/img/uploads/1/247/508247.jpg'
  },
  {
    id: '3',
    nome: 'Óleo de Soja 900ml',
    preco: 4.99,
    descricao: 'Óleo de soja refinado, garrafa de 900ml. Ideal para frituras e preparos.',
    categoria: 'Alimentos básicos',
    imagem: 'https://www.paodeacucar.com/img/uploads/1/3/508003.jpg'
  },
  {
    id: '4',
    nome: 'Sabão em Pó 1kg',
    preco: 12.90,
    descricao: 'Sabão em pó para roupas, embalagem de 1kg. Remove as manchas mais difíceis.',
    categoria: 'Limpeza',
    imagem: 'https://m.media-amazon.com/images/I/71+UYj5Qb-L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: '5',
    nome: 'Desinfetante 2L',
    preco: 8.75,
    descricao: 'Desinfetante aroma pinho, frasco de 2 litros. Elimina 99,9% dos germes.',
    categoria: 'Limpeza',
    imagem: 'https://www.paodeacucar.com/img/uploads/1/262/508262.jpg'
  },
];

const App = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [telaAtual, setTelaAtual] = useState('produtos');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (produtoId) => {
    const index = carrinho.findIndex(item => item.id === produtoId);
    if (index !== -1) {
      const novoCarrinho = [...carrinho];
      novoCarrinho.splice(index, 1);
      setCarrinho(novoCarrinho);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + produto.preco, 0).toFixed(2);
  };

  const renderizarItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => {
        setProdutoSelecionado(item);
        setTelaAtual('detalhes');
      }}
    >
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={styles.botaoAddMini}
        onPress={(e) => {
          e.stopPropagation();
          adicionarAoCarrinho(item);
        }}
      >
        <Text style={styles.botaoAddMiniTexto}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderizarDetalhes = () => (
    <View style={styles.detalhesContainer}>
      <Image source={{ uri: produtoSelecionado.imagem }} style={styles.detalhesImagem} />
      <View style={styles.detalhesConteudo}>
        <Text style={styles.detalhesNome}>{produtoSelecionado.nome}</Text>
        <Text style={styles.detalhesCategoria}>{produtoSelecionado.categoria}</Text>
        
        <View style={styles.precoContainer}>
          <Text style={styles.detalhesPreco}>R$ {produtoSelecionado.preco.toFixed(2)}</Text>
        </View>
        
        <View style={styles.descricaoContainer}>
          <Text style={styles.detalhesDescricao}>{produtoSelecionado.descricao}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.botaoAdicionar}
          onPress={() => {
            adicionarAoCarrinho(produtoSelecionado);
          }}
        >
          <Text style={styles.botaoTexto}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.botaoVoltar}
        onPress={() => setTelaAtual('produtos')}
      >
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderizarCarrinho = () => (
    <View style={styles.carrinhoContainer}>
      <View style={styles.carrinhoHeader}>
        <TouchableOpacity onPress={() => setTelaAtual('produtos')}>
          <Text style={styles.botaoVoltarTexto}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Seu Carrinho</Text>
        <View style={{ width: 24 }}></View>
      </View>
      
      {carrinho.length === 0 ? (
        <View style={styles.carrinhoVazioContainer}>
          <Text style={styles.carrinhoVazioIcon}>🛒</Text>
          <Text style={styles.carrinhoVazioTitulo}>Seu carrinho está vazio</Text>
          <Text style={styles.carrinhoVazioTexto}>Adicione produtos para continuar</Text>
          <TouchableOpacity 
            style={styles.botaoComprar}
            onPress={() => setTelaAtual('produtos')}
          >
            <Text style={styles.botaoTexto}>Ver Produtos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={carrinho}
            renderItem={({ item }) => (
              <View style={styles.itemCarrinho}>
                <Image source={{ uri: item.imagem }} style={styles.carrinhoImagem} />
                <View style={styles.carrinhoInfo}>
                  <Text style={styles.carrinhoNome} numberOfLines={1}>{item.nome}</Text>
                  <Text style={styles.carrinhoPreco}>R$ {item.preco.toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.botaoRemover}
                  onPress={() => removerDoCarrinho(item.id)}
                >
                  <Text style={styles.botaoRemoverTexto}>×</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          
          <View style={styles.resumoCompra}>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoTexto}>Subtotal</Text>
              <Text style={styles.resumoTexto}>R$ {calcularTotal()}</Text>
            </View>
            <View style={styles.resumoLinha}>
              <Text style={styles.resumoTexto}>Entrega</Text>
              <Text style={styles.resumoTexto}>Grátis</Text>
            </View>
            <View style={styles.resumoLinhaTotal}>
              <Text style={styles.resumoTotalTexto}>Total</Text>
              <Text style={styles.resumoTotalTexto}>R$ {calcularTotal()}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.botaoFinalizar}
              onPress={() => alert('Compra finalizada com sucesso!')}
            >
              <Text style={styles.botaoTexto}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
      
      {telaAtual === 'produtos' && (
        <>
          <View style={styles.header}>
            <Text style={styles.titulo}>Atacadão Premium</Text>
            <TouchableOpacity 
              style={styles.carrinhoButton}
              onPress={() => setTelaAtual('carrinho')}
            >
              <Text style={styles.carrinhoIcon}>🛒</Text>
              {carrinho.length > 0 && (
                <View style={styles.carrinhoBadge}>
                  <Text style={styles.carrinhoBadgeTexto}>{carrinho.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={produtos}
            renderItem={renderizarItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.lista}
          />
        </>
      )}
      
      {telaAtual === 'detalhes' && renderizarDetalhes()}
      {telaAtual === 'carrinho' && renderizarCarrinho()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6C63FF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  carrinhoButton: {
    position: 'relative',
    padding: 8,
  },
  carrinhoIcon: {
    fontSize: 24,
    color: 'white',
  },
  carrinhoBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinhoBadgeTexto: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  lista: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  categoria: {
    fontSize: 12,
    color: '#6C63FF',
    marginBottom: 5,
    fontWeight: '500',
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  botaoAddMini: {
    backgroundColor: '#6C63FF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoAddMiniTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  detalhesContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  detalhesImagem: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detalhesConteudo: {
    padding: 20,
  },
  detalhesNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detalhesCategoria: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
    marginBottom: 15,
  },
  precoContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  detalhesPreco: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  descricaoContainer: {
    marginBottom: 30,
  },
  detalhesDescricao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  botaoAdicionar: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  botaoVoltar: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoVoltarTexto: {
    fontSize: 24,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  carrinhoContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  carrinhoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6C63FF',
  },
  carrinhoVazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  carrinhoVazioIcon: {
    fontSize: 60,
    marginBottom: 20,
    color: '#ddd',
  },
  carrinhoVazioTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  carrinhoVazioTexto: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  itemCarrinho: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  carrinhoImagem: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  carrinhoInfo: {
    flex: 1,
  },
  carrinhoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  carrinhoPreco: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  botaoRemover: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoRemoverTexto: {
    color: '#f44336',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  resumoCompra: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resumoLinhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  resumoTexto: {
    fontSize: 16,
    color: '#666',
  },
  resumoTotalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  botaoComprar: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  botaoFinalizar: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default App;

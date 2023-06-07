<template>
    <div class="modal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h3>{{ produto.attributes.nome }}</h3>
            <br>
            <img :src="produto.attributes.imagem" alt="Imagem do Produto">
            <br> 
            <h5>{{produto.attributes.categoria.data.attributes.nome}}</h5>
            <span>{{produto.attributes.descricao}}</span> 
            <span>
                <br>
                <button class="btn btn-danger" @click="eliminarProduto(produto)">Eliminar</button>

            </span>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        produto: {
            type: Object,
            required: true
        },
        showModal: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        eliminarProduto(produto) {
            fetch(`http://127.0.0.1:1337/api/produtos/${produto.id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert("Produto Removido com sucesso!")
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erro ao excluir o produto:', error);
                });
        }
    }
};
</script>
  
<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    text-align: center;
    width: 70%;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}
</style>
  
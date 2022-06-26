const BTN_REINICIAR = "btnReiniciar"
const ID_CONTADOR = "contador"
const VALOR_CONTADOR = 100
const PERIODO_INTERVALO = 10

class ContadorComponent {
    constructor() {
        this.inicializar()
    }

    preparContadorProxy() {
        const handler = {
            set: (currentContext, propertyKey, newValue) => {
                console.table({ currentContext, propertyKey, newValue })
                /**
                 * @description parando todo o processamento
                 */
                if (!currentContext.valor) currentContext.efetuarParada()
                currentContext[propertyKey] = newValue
                return true
            }
        }

        const contador = new Proxy({
            valor: VALOR_CONTADOR,
            efetuarParada: () => { }
        }, handler)

        return contador
    }

    /**
     *@description Função do tipo Clousure
     */
    atualizarTexto = ({ elementoContador, contador }) => () => {
        elementoContador.innerHTML = `Começando em <strong>${contador.valor--}</strong> segundos...`
    }

    /**
     *@description Função do tipo Clousure, mas com uma sintaxe diferente, apenas para saber que dá para fazer
     */
    agendarParadaContador({ elementoContador, idIntervalo }) {
        return () => {
            clearInterval(idIntervalo)
            elementoContador.innerHTML = ''
            this.desabilitarBotao(false)
        }
    }

    preparBotao(elementoBotao, iniciarFn) {
        elementoBotao.addEventListener('click', iniciarFn.bind(this))

        /**
         * @description Colocando um valor como default no parâmetro para caso ele venha vazio
         */
        return (valor = true) => {
            const atributo = 'disabled'
            valor ? elementoBotao.setAttribute(atributo, true) : elementoBotao.removeAttribute(atributo)
        }
    }

    inicializar() {
        const elementoContador = document.getElementById(ID_CONTADOR)
        const contador = this.preparContadorProxy()
        const argumentos = {
            elementoContador,
            contador
        }
        const fnClousure = this.atualizarTexto(argumentos)
        const idIntervalo = setInterval(() => fnClousure(), 100)

        /**
         * @description criando um contexto separado dentro da função, logo podemos cria uma variável com o mesmo nome que a de cima.
         */
        {
            const elementoBotaoReiniciar = document.getElementById(BTN_REINICIAR)
            const desabilitarBotao = this.preparBotao(elementoBotaoReiniciar, this.inicializar)
            desabilitarBotao()


            const argumentos = { elementoContador, idIntervalo }
            const pararContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos])
            contador.efetuarParada = pararContadorFn
        }
    }
}
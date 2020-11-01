/** 
 * 
*/

import React, { Component } from "react";
// modal component
import ModalComponent from "./modal-component";

class GSAPModal extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			modalVisible: false
		};

		this.setModalVisible = this.setModalVisible.bind(this);
	}

	setModalVisible = v => this.setState({ modalVisible: v });

	render(){
		return <div>
			
			<div className="container">
				<div className="row">
					
					<div className="col-12 mt-3">
						<h3 className="text-center">State Controlled Modal</h3>
						<hr />
						<p>Анимирует модальное окно, изменяя состояние компонента.</p>
						<p>В этом примере модальная анимация управляется изменением состояния основного компонента, затем это состояние передается в качестве опоры модальному компоненту. Анимация входа / выхода модального окна зависит от переданного ему значения свойства.</p>
						<p>Метод закрытия также передается модальному компоненту как опора, чтобы скрыть модальное окно с помощью кнопки закрытия внутри модального компонента.</p>
					</div>

					<div className="col-12">
						<button
							className="btn gsap-btn"
							onClick={this.setModalVisible.bind(null, true)}
						>
							Показать модал
						</button>
						<hr/>
					</div>

					<div className="col-12 col-md-6">
						<h4>Состояние основного компонента</h4>
						<pre className="p-2">
							{ JSON.stringify(this.state, null, 2) }
						</pre>
					</div>
					<div className="col-12 col-md-6">
						<h4>Реквизиты модальных компонентов</h4>
						<pre className="p-2">
							{JSON.stringify({
								visible: this.state.modalVisible
							}, null, 2)}
						</pre>
					</div>

				</div>
			</div>

			<ModalComponent
				visible={this.state.modalVisible}
				close={this.setModalVisible.bind(null, false)}
			/>

		</div>;
	}

}

export default GSAPModal;

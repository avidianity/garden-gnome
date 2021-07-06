import axios from 'axios';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { UserContract } from '../Contracts/user.contract';
import { handleError } from '../helpers';
import { State } from '../Libraries/State';
import { routes } from '../routes';

type Props = {};

type Inputs = {
	username: string;
	password: string;
};

const Login: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const { register, handleSubmit } = useForm<Inputs>();
	const history = useHistory();
	const state = State.getInstance();

	const submit = async (payload: Inputs) => {
		setProcessing(true);
		try {
			const {
				data: { token, user },
			} = await axios.post<{ token: string; user: UserContract }>('/auth/login', payload);
			toastr.success(`Welcome back, ${user.username}.`);
			state.set('token', token);
			state.set('user', user);
			history.push(routes.DASHBOARD);
		} catch (error) {
			handleError(error, false);
		} finally {
			setProcessing(false);
		}
	};

	if (state.has('user')) {
		history.push(routes.DASHBOARD);
		return null;
	}

	return (
		<div className='wrapper vh-100 overflow-hidden'>
			<div className='d-flex align-items-center h-100'>
				<form className='mx-auto text-center' onSubmit={handleSubmit(submit)}>
					<Link className='navbar-brand mx-auto mt-2 flex-fill text-center' to={routes.HOME}>
						<img src='/logo.png' alt='SF-SNMS' style={{ width: '64px', height: '64px' }} className='rounded-circle border' />
					</Link>
					<h4>Smart Farming: A Soil Nutrient Monitoring System</h4>
					<h1 className='h6 mb-3'>Sign In</h1>
					<div className='form-group'>
						<label htmlFor='username' className='sr-only'>
							Username
						</label>
						<input
							{...register('username')}
							type='username'
							id='username'
							className='form-control'
							placeholder='Username'
							disabled={processing}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password' className='sr-only'>
							Password
						</label>
						<input
							{...register('password')}
							type='password'
							id='password'
							className='form-control'
							placeholder='Password'
							disabled={processing}
						/>
					</div>
					<button className='btn btn-primary btn-block' type='submit' disabled={processing}>
						{processing ? <i className='la la-circle-notch la-spin'></i> : 'Login'}
					</button>
					<div className='text-left pt-2'>
						<Link to={routes.REGISTER}>Don't have an account? Sign Up</Link>
					</div>
					<p className='mt-5 mb-3 text-muted'>© {new Date().getFullYear()}</p>
				</form>
			</div>
		</div>
	);
};

export default Login;

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
const url=process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const key=process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
export const configured=Boolean(url && key && url.includes('.supabase.co') && !key.includes('YOUR_'));
export const supabase=createClient(url || 'https://placeholder.supabase.co',key || 'placeholder',{auth:{storage:AsyncStorage,autoRefreshToken:true,persistSession:true,detectSessionInUrl:false}});
export async function allRows(table:string,columns='*',order?:string,max=10000){
  const result:any[]=[];
  for(let i=0;i<max;i+=500){let q:any=supabase.from(table).select(columns).range(i,Math.min(i+499,max-1));if(order)q=q.order(order,{ascending:false});const {data,error}=await q;if(error)throw error;result.push(...(data||[]));if(!data||data.length<500)break;}
  return result;
}
export const num=(x:any)=>Number(x)||0;
export const money=(n:any)=>`${Math.round(num(n)).toLocaleString('en-US')} ₫`;
export const date=(x:any)=>x?String(x).slice(0,10):'—';
export const todayVN=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());

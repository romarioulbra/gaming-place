// // /app/api/emblemas-desbloqueados/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const usuarioId = Number(searchParams.get("usuarioId"));

//   if (!usuarioId) {
//     return NextResponse.json({ error: "Usuário não informado." }, { status: 400 });
//   }

//   try {
//     // Busca todos os emblemas do sistema
//     console.log("Buscando todos os emblemas...");
//     const todosEmblemas = await prisma.emblemas.findMany();
//     console.log(`Encontrados ${todosEmblemas.length} emblemas`);
    
//     // Busca os emblemas do usuário com seus status e pontos
//     console.log(`Buscando emblemas do usuário ${usuarioId}...`);
//     const emblemasUsuario = await prisma.usuario_tipo_emblema.findMany({
//       where: { usuarioId },
//       include: {
//         tipoEmblema: {
//           include: {
//             emblema: true
//           }
//         }
//       }
//     });
//     console.log(`Usuário tem ${emblemasUsuario.length} emblemas registrados`)

//     // Combina os dados
//     const emblemasFormatados = todosEmblemas.map((emblema) => {
//       // Encontra o registro do usuário para este emblema (se existir)
//       const registroUsuario = emblemasUsuario.find(
//         eu => eu.tipoEmblema?.emblema_id === emblema.emblema_id
//       );

//       // Adicione validações
//   if (!registroUsuario) {
//     return {
//       ...emblema,
//       desbloqueado: false,
//       pontos: 0,
//       pontos_acumulativos: 0,
//       status: "BLOQUEADO"
//     };
//   }

//       // Aplica a lógica de bloqueio/desbloqueio
//       const pontos = registroUsuario?.usuario_emblema_pontos || 0;
//       const status = registroUsuario?.usuario_emblema_status || "BLOQUEADO";
      
//       const desbloqueado = status === "DESBLOQUEADO" && pontos > 0;
//       console.log(`Emblema ${emblema.emblema_id}:`, {
//         status,
//         pontos,
//         desbloqueado
//       });

//       return {
//         emblema_id: emblema.emblema_id,
//         emblema_nome: emblema.emblema_nome,
//         emblema_imagem: emblema.emblema_imagem,
//         emblema_criterio: emblema.emblema_criterio,
//         desbloqueado,
//         pontos,
//         status
//       };
//     });


//     console.log("Dados completos retornados:", {
//       emblemas: emblemasFormatados
//     });
//     return NextResponse.json({ emblemas: emblemasFormatados });
//   } catch (error) {
//     console.error("Erro detalhado:", error);
//     console.error("Erro ao buscar emblemas:", error);
//     return NextResponse.json({ error: "Erro interno." }, { status: 500 });
//   }
// }


// /app/api/emblemas-desbloqueados/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const usuarioId = Number(searchParams.get("usuarioId"));

  if (!usuarioId) {
    return NextResponse.json({ error: "Usuário não informado." }, { status: 400 });
  }

  try {
    // Busca todos os emblemas do sistema
    const todosEmblemas = await prisma.emblemas.findMany();
    
    // Busca os emblemas do usuário com seus status e pontos
    const emblemasUsuario = await prisma.usuario_tipo_emblema.findMany({
      where: { usuarioId },
      include: {
        tipoEmblema: {
          include: {
            emblema: true
          }
        }
      }
    });

    // Combina os dados
    const emblemasFormatados = todosEmblemas.map((emblema) => {
      const registroUsuario = emblemasUsuario.find(
        eu => eu.tipoEmblema?.emblema_id === emblema.emblema_id
      );

      if (!registroUsuario) {
        return {
          ...emblema,
          desbloqueado: false,
          pontos: 0,
          pontos_acumulativos: 0,
          status: "BLOQUEADO",
          coletado: false
        };
      }

    const desbloqueado = registroUsuario.usuario_emblema_status === "DESBLOQUEADO";
    const coletado = registroUsuario.usuario_emblema_status === "BLOQUEADO" && 
                   registroUsuario.usuario_emblema_pontos === 0;

      return {
       ...emblema,
        desbloqueado,
        pontos: desbloqueado ? registroUsuario.usuario_emblema_pontos : 0,
        pontos_acumulativos: registroUsuario.usuario_emblemas_pontos_acumulativo,
        status: registroUsuario.usuario_emblema_status,
        coletado
      };
    });

    return NextResponse.json({ emblemas: emblemasFormatados });
  } catch (error) {
    console.error("Erro ao buscar emblemas:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
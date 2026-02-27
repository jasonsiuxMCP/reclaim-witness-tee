
const fs = require('fs');

// Basic configuration via env
const PORT = process.env.PORT || 8080;
// Demo key - IN PRODUCTION THIS MUST BE INJECTED SECURELY INTO TEE
const PRIVATE_KEY = process.env.PRIVATE_KEY_HEX || "0xc636030db37539882a46c90da8146f5cd3c0d163de9d1030972ced48826ee643"; 

// SET ENV VARIABLES BEFORE REQUIRING ATTESTOR-CORE
// because attestor-core reads process.env.PRIVATE_KEY at module load time
process.env.PRIVATE_KEY = PRIVATE_KEY;
process.env.PORT = PORT;
// Disable BGP checks for local simulation/TEE standalone mode
process.env.DISABLE_BGP_CHECKS = "1";

// Now require the library
const { createServer } = require('../node_modules/@reclaimprotocol/attestor-core/lib/server/create-server');
const { logger } = require('../node_modules/@reclaimprotocol/attestor-core/lib/utils/logger');

async function start() {
    logger.info("Starting Reclaim Witness Server (MPC/TEE Mode)...");
    
    try {
        const server = await createServer(PORT);
        logger.info(`Witness Server is running on port ${PORT}`);
        
        // Keep alive
        process.on('SIGINT', () => {
            logger.info("Stopping server...");
            server.close(() => {
                process.exit(0);
            });
        });
    } catch (err) {
        logger.error({ err }, "Failed to start witness server");
        process.exit(1);
    }
}

start();

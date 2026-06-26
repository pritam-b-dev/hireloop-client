"use client";
import React from "react";
import { Button, Modal } from "@heroui/react";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[400px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="flat" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

# Auto-generated script for Linux Mint
# Generated from: linuxmint.md
# Mirror ID: linux-mint



_linux-mint_install_1() {
	# 替换Linux Mint主仓库
	set_sudo

	if [ -f /etc/apt/offical-package-repositories.list ]; then
		mkdir -p ${_backup_dir} || {
			print_error "Failed to create backup directory"
			return 1
		}
		[ -f ${_backup_dir}/linux-mint__etc_apt_offical-package-repositories.list.bak ] || $sudo cp /etc/apt/offical-package-repositories.list ${_backup_dir}/linux-mint__etc_apt_offical-package-repositories.list.bak || {
			print_error "Backup /etc/apt/offical-package-repositories.list failed"
			return 1
		}
		$sudo sed -i -E -e "s|http://packages.linuxmint.com|$http://$domain/linuxmint|g" /etc/apt/offical-package-repositories.list || {
			print_error "Failed to update /etc/apt/offical-package-repositories.list"
			return 1
		}
	else
		print_warning "File /etc/apt/offical-package-repositories.list does not exist"
	fi

	if [ -f /etc/apt/offical-package-repositories.list ]; then
		$sudo sed -i -E -e "s|http://archive.ubuntu.com|$http://$domain|g" /etc/apt/offical-package-repositories.list || {
			print_error "Failed to update /etc/apt/offical-package-repositories.list"
			return 1
		}
	else
		print_warning "File /etc/apt/offical-package-repositories.list does not exist"
	fi

	return 0
}

_linux-mint_install_2() {
	# Execute commands
	set_sudo

	# Execute commands
	$sudo apt-get update

	return 0
}

install() {

	_linux-mint_install_1 || return 1
	_linux-mint_install_2 || return 1
	print_success "Mirror configuration updated successfully"
}

uninstall() {
	# Recover from backup files and execute recovery commands
	print_info "Starting recovery process..."

	# Restore files from backup
	if [ -f ${_backup_dir}/linux-mint__etc_apt_offical-package-repositories.list.bak ]; then
		set_sudo
		$sudo cp "${_backup_dir}/linux-mint__etc_apt_offical-package-repositories.list.bak" /etc/apt/offical-package-repositories.list 2>/dev/null || true
		print_info "Restored /etc/apt/offical-package-repositories.list"
	fi

	print_success "Recovery completed"
}

can_recover() {
	# Check if any backup files exist
	[ -f ${_backup_dir}/linux-mint__etc_apt_offical-package-repositories.list.bak ]
}

is_deployed() {
	# Check if any replaced file contains domain variable
	[ -f /etc/apt/offical-package-repositories.list ] && grep -q "$domain" /etc/apt/offical-package-repositories.list 2>/dev/null && return 0
	return 1
}
